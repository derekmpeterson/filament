$(function(){
	$("body").get(0).style.margin='0px';
	$("canvas").get(0).width = 900;
	$("canvas").get(0).height = 500;
	
	console.log($("#deathDate"));
	$("#deathDate").datepicker({changeMonth:true,changeYear:true,yearRange:'1700:2012'});
	
	center = new Object({x:$("canvas").get(0).width/2, y:$("canvas").get(0).height/2});
	$("canvas").drawRect({
		fillStyle:"#aaaaaa",
		x: center.x, y: center.y,
		width: $("canvas").get(0).width, height: $("canvas").get(0).height
	});

	img = new Object();
	img.x = 0;
	img.y = 0;
	img.o = new Image();
	img.o.src = 'http://2.bp.blogspot.com/-H8F9w0SUPp8/TV2uTv34OdI/AAAAAAAABCo/VCIRtQD-SQQ/s1600/Medlin-WmRiley+DC.jpg';

	$(img.o).load(function(){
		img.scale = $("canvas").get(0).width / img.o.width;
		render();
	});
	$("canvas").bind('mousewheel',(function(event,delta){
		event.preventDefault();
		//console.log(delta);
		scaleChange = (delta * .1);
		img.scale += scaleChange;
		diffX = scaleChange * img.o.width;
		diffY = scaleChange * img.o.height;
		//console.log(diffX+','+diffY);
		img.x -= diffX/3;
		img.y -= diffY/3;
		render();
	}));
	mouseDown = false;
	startX = 0;
	startY = 0;
	$("canvas").mousedown(function(e){
		mouseDown = true;
		startX = e.pageX - $("canvas").get(0).offsetLeft;
		startY = e.pageY - $("canvas").get(0).offsetTop;
		
	});
	$("canvas").mouseup(function(event){
                mouseDown = false;
        });
	$("canvas").mousemove(function(e){
		if(mouseDown){
			mx = e.pageX - $("canvas").get(0).offsetLeft;
                        my = e.pageY - $("canvas").get(0).offsetTop;
			
			diffX = mx - startX;
			diffY = my - startY;
			img.x += diffX;
			img.y += diffY;
			startX = mx;
			startY = my;
			render();
		}
	});
	function render(){
		$("canvas").drawRect({
                fillStyle:"#aaaaaa",
                x: center.x, y: center.y,
                width: $("canvas").get(0).width, height: $("canvas").get(0).height
        }).draw(function(ctx){
			ctx.drawImage(img.o,0,0,img.o.width,img.o.height,img.x,img.y,img.scale*img.o.width,img.scale*img.o.height);
                });
	}
});
