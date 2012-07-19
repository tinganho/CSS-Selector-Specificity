
var Specificity = (function(){
    
    
    var C = {};
    
    // CSS Pseudo Classes http://www.w3.org/TR/CSS2/selector.html#link-pseudo-classes & http://reference.sitepoint.com/css/pseudoclasses
    var pseudoClassesCSS2 = [':first-child', ':link', ':visitied', ':hover', ':active', ':focus', ':lang'];
    
    // CSS3 Pseudo Classes http://reference.sitepoint.com/css/pseudoclasses
    var pseudoClassesCSS3 = 
        [':nth-child', ':nth-last-child', ':nth-of-type', ':nth-of-last-type', 
         ':first-of-type', ':last-of-type', ':only-child', ':only-of-type',  
         ':root', ':empty', ':target', ':enabled', ':disbaled', ':checked', ':not'];
    
    const pseudoClasses = pseudoClassesCSS2.concat(pseudoClassesCSS3);

    // Pseudo Elements http://reference.sitepoint.com/css/pseudoelements
    const pseudoElements = ['first-line', 'first-letter', 'before', 'after', ':selection'];
    
    
    function numMatches(selector, regex) {
       return (selector.match(regex)||[]).length;
    }
    
    function is(selector, element) {
      var div = document.createElement("div"),
      matchesSelector = div.webkitMatchesSelector;
      return typeof selector == "string" ? matchesSelector.call(element, selector) : selector === element;
    }
    
    function getBiggestPoint(points) {
        var points = C.sortPoints(points);
        return points[0];
    }
    
    C.sortPoints = function(points) {
        points.sort(function(a, b) {
            if(a[0] > b[0])
                return -1;
            if(a[0] < b[0])
                return 1;
            if(a[1] > b[1])
                return -1;
            if(a[1] < b[1])
                return 1;
            if(a[2] > b[2])
                return -1;
            if(a[2] < b[2])
                return 1;
            else 
                return 0;
        })
            
        return points;
    }
    
    C.getSpecificity = function(selector, element) {
    
    
    
    
        var splittedSelector = selector.split(',');
        var points = [];
        
        for(var i in splittedSelector) if (splittedSelector.hasOwnProperty(i)) {
            
            
            
            if(!is(splittedSelector[i], element)) continue;
            
            var numClasses = numMatches(splittedSelector[i], /\.[\w-_]+\b/g);
            var numIds = numMatches(splittedSelector[i], /#[\w-_]+\b/g);
            var numNamesInBraces = 0;
            var namesInBraces = splittedSelector[i].match(/\[[^\]]*\b[\w-_]+\b[^\]]*\]/g) || [];
            for (var idx = 0; idx < namesInBraces.length; ++idx) {
                numNamesInBraces += (namesInBraces[idx].match(/\b[\w-_]+\b/g)||[]).length;
            }
            var results = [0,0,0];
            results[0] = numIds;
            results[1] = numMatches(splittedSelector[i], /\[[^\]]+\]/g) + numClasses;
            results[2] = numMatches(splittedSelector[i], /\b[\w-_]+\b/g) - numIds - numClasses - numNamesInBraces;
            points.push(results);
        }
        
        return getBiggestPoint(points);
    }
    
    
    C.constructor();
    
    return C;
})()





    
var element = document.createElement('div');
element.className = 'hello juoo';

document.write(JSON.stringify(Specificity.getSpecificity("html, body", element)));