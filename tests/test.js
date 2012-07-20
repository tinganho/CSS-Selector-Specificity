


test('Test sort poinst', function(){

	var points1 = [0, 0, 1],
	points2 = [1, 1, 1],
	points3 = [1,0,1],
	points4 = [0,0,3],
	points5 = [0,1000, 56],

	// All points
	points = [points4, points1, points2, points3, points5];
	deepEqual(Specificity.sortPoints(points), [points2, points3, points5, points4, points1], 'Sorting function sorts correctly');
});

test('Testing CSS Specificity points', function(){

	var element = document.createElement('div');
	element.id = 'test'
	element.className = 'test1 test2';
	element.setAttribute('href', 'test');
	var selector = 'div#test.test1.test2[href=test]';

	// Testing elements specificity point
	deepEqual(Specificity.getSpecificity(selector, element), [1, 3, 1], 'An element have the correct specificity');

});