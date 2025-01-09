/*
		List
		список JSON - активности и реакции 
		js_json_activ  
*/


$(document).ready(function(){
	t = List;

	// 101 показ элемента по клику на него
	$('#list #work_zone').on( 'click', '.rbt',function(e){
		t.cl(' 101 показ элемента по клику на него в зоне work_zone');
		t.cl(this.title);
		t.click_rbt( this.title )
	});	

	// 102 сокрытие элемента #show_zone по клику вне его и кнопке с крестом
	$('#list .close').on( 'click', function(e){
		t.cl(' 102 сокрытие элемента #show_zone по клику вне его в зоне show_zone');
		t.close_show_one();
	});

	// 102.ESC сокрытие элемента #show_zone по клику клавиши ESC 
	$(document).keyup(function(e) {
		if (e.key === "Escape" || e.keyCode === 27) {
			t.cl(' 102.ESC сокрытие элемента #show_zone по клику клавиши ESC ');
			t.close_show_one();
		}
	});

	// 103 предотвращение сокрытия элемента по клику по инфо. полям
	$('#list #show_zone #text_zone ').on( 'click','div', function(e){
		t.cl(' 103 предотвращение сокрытия элемента по клику по нему в зоне show_zone');
		e.stopPropagation();
	});	

	// 104 клик по режиму JSON
	$('#o_json').on( 'click', function(e){
		t.cl(' 104 клик по режиму JSON');
		List.query_JSON();
	});		
	
	// 105 клик по режиму JSON
	$('#o_php').on( 'click', function(e){
		t.cl(' 105 клик по режиму PHP');
		List.query_PHP();
	});
	
	// 106 клик по "оформлению JSON"
	$('#o_decor').on( 'click', function(e){
		t.cl(' 105 клик по оформлению JSON');
		$("#work_zone").html( t.decorate( t.X, t.templ_all ) );
	});	
	
	// 106 клик по "очистить вывод"
	$('#o_clear').on( 'click', function(e){
		t.cl(' 106 клик по "очистить вывод');
		$("#work_zone").html('' );
	});		
/*	*/	
	
});