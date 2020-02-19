"use strict";

var $main = document.querySelector('.grid');
var $links = Array.from( $main.querySelectorAll('a') );
var $cursor = document.querySelector('.cursor');
var $link = document.querySelector('.link');
var contentHeight = $main.getBoundingClientRect().height;

function clamp ( x, min, max ) {
	return Math.min( Math.max( x, min ), max );
}

function map ( x, oldMin, oldMax, newMin, newMax ) {
	return newMin + x / ( oldMax - oldMin ) * ( newMax - newMin );
}

function intersectsCenter ( element ) {
	var rect = element.getBoundingClientRect();
	var cx = window.innerWidth / 2;
	var cy = window.innerHeight / 2;
	return cx >= rect.left && cx < rect.right && cy >= rect.top && cy < rect.bottom;
}

function render ( x, y ) {
	y = map( y, 0, window.innerHeight, 0, Math.max( window.innerHeight, contentHeight ) );
	x = window.innerWidth - x;
	y = ( window.innerHeight - y ) - ( window.innerHeight / 2 );
	$main.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
	var $hovered = $links.find( intersectsCenter );
	if ( $hovered ) {
		// $cursor.classList.add('pointer');
		$link.href = $hovered.href;
		$link.target = $hovered.target;
	} else {
		// $cursor.classList.remove('pointer');
		$link.removeAttribute('href');
		$link.removeAttribute('target');
	}
}

if ( 'ontouchstart' in window ) {
	document.documentElement.classList.add( 'touch' );
	$main.style.opacity = 1;
} else {
	window.addEventListener( 'mousemove', function show () {
		$main.style.opacity = 1;
		window.removeEventListener( 'mousemove', show );
	});
	window.addEventListener( 'mousemove', function ( e ) {
		render( e.clientX, e.clientY );
	});
}
