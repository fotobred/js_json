/*
		List
		получение и обработка данных из JSON
*/
//import list from 'data/list.json'; 

var List = List || {};

	
List = {
	
	gc: 0, 					// "глобальный" счетчик
	test_out: "yes", // "N" // режим вывода диагностики 

	X: {},

	// cl() - вывод дополнительной отладочной информации со сквозной нумерацией
	// console.log ( gc + x ) 
	// x - информация для вывода
	cl( x ){
		t = this;
		if ( t.test_out != 'N'  ){
			//	console.log ('(-> ' + typeof( x ) + ' )' );
			if( typeof( x ) == 'string' ) {					// если "на входе" строка сообщения
				console.log( '( ' + t.gc++ + ' ) ' + x );	// выводим увеличенный счетчик и строку
			} else { 
				console.log( x );	// если "на входе" НЕ строка - выводим как объект
			}
			if( t.gc > 50020 ){		//  защита от "зацикливания"
				alert('Oy!');
			}
		}
	},
	
	//  decorate_one( X, templ ) - оформление одной записи по шаблону
	//   X  	-  оформляемая запись
	//   templ 	-  шаблон оформления
	decorate_one( X, templ ){  
		t = this;
		t.cl( 'decorate_one::templ: '+ templ +' ' ); t.cl( X )
		t.cl( Object.keys( X )[0] )
				
			var i = out = ''  ;
			if( !!templ ){ 		// проверка наличия шаблона оформления
				for( i in X ) {	// перебор записей
					t.cl( '( i ) - '+i )
					if( typeof( X[i] ) == "object" ) {	// если имеем 'object'
		//				t.cl( 'decorate_one:  ---> [object]  <--- переход на следующий уровень --- ' );
						templ = t.decorate_one( X[i], templ );	// переходим на следующий уровень
					} else {
						if( typeof X[i] ) {						// если есть элемент 
							var rX = new RegExp( "#" + i + "#", 'g' );	// регулярное выражение для подстановки
								templ = templ.replace( rX , X[i]  );	// заменяем имена в шаблонах на значения
								t.cl( 'decorate_one: rX [' + rX + '] ->  tX [' + X[i] + '] ' ); t.cl( 'OUT:  ['+templ+']' );
						};			
					};
					if (  templ.search( /#/ )   < 0 ){	// провека на не заполненные поля в шаблоне
						t.cl ( 'decorate_one: шаблон [temp] заполнен:  ' + templ  );		
						break;							// если заполнять нечего - на выход
					} else {
				//		t.cl( 'decorate_one:templ::' + templ );
					};
				};
			} else { 
				t.cl( "Ошибка открытия шаблона оформления в decorate_one");
			//	alert( "Ошибка открытия шаблона оформления в decorate_one");
			};	
		return templ ;	
	},

	//  decorate( X ) - распределение оформления полученного набора записей
	//   X  	-  набор записей
	//   templ 	-  шаблон оформления	
	decorate( X, templ_in ){  
		let t = this;
		t.cl( 'decorate::X: ' ); t.cl( X );
		t.cl( 'decorate::шаблон: ' ); t.cl( templ_in );
		let x = out = sum_out = ''  ;
		
			length_X = Object.keys( X ).length;		//	 объем ответа 
			t.cl( 'decorate::объем ответа: ' + length_X );
			if(  length_X > 0 ) {	// если в данных много персон - передаем на оформление по одной
				templ = templ_in ;		
		//		t.cl( 'decorate:: шаблон оформления: '+ templ +' ' ); 
				if( !!templ ){ 			// проверка на наличие шаблона оформления
					Object.entries(X).forEach(( x ) => {	// перебор записей 
						
						if( typeof( x ) == "object" ) {	// если имеем 'object'
			//				t.cl( 'decorate: -> [object] - передаем на оформление ' );
							out = t.decorate_one( x, templ );	// переход на оформление элемента/персоны				
			//				t.X[x.name] = x ;					// пополняем "рабочую базу" персон
						};
						t.cl( 'out:' + out );
						sum_out = sum_out + out ;
					});
				};
			} else {
				t.cl( "Ошибка обработки данных в decorate");
			//	alert( "Ошибка обработки данных в decorate");
			};	
			t.cl ( "sum_out: " );	t.cl ( sum_out );
		return sum_out ;	
	},


	// закрытие "one" окна
	close_show_one( x ){
		$( '#list #show_zone' ).removeClass('show');
		$( '#list #show_zone #title' ).html('');
		$( '#list #show_zone #text_zone').html('');
	},


	show_JSON( x ){
		let result = '<pre>'+JSON.stringify( x, null, 2)+'</pre>';
		$('#work_zone').html( result );
		//document.getElementById('myDiv').innerHTML = `&lt;pre&gt;${result}&lt;/pre&gt;`;
	},

	// обработка клика на rbt
	click_rbt( rbt ){
		let x = out = '',
			t = this;
		t.cl( 'click_rbt:: получен запрос - ' + rbt );
		x = List.X[rbt]['список'];		// взяли данные 
		t.cl( 'click_rbt:: данные для отображения: ' );  t.cl( x );
		$( '#show_zone' ).addClass('show');		// показ элемента
		$( '#show_zone  #title' ).html( List.X[rbt]['название'] );
		$( '#show_zone  #text_zone' ).empty();	// очистка элемента
		t.cl( 'click_rbt:: шаблон для отображения: ' );  t.cl( t.templ_one )	
		out = t.decorate( x, t.templ_one );		// переход на оформление элемента/персоны					
		$('#show_zone  #text_zone ').append( out );		// "публикация" информации		
			
	},

	//  getting получение и обработка ответа сервера
	getting( X ){
		t = this;
		t.cl( 'getting:: полученный результат [ X ]' );  t.cl( X );
		if( typeof( X ) != "object" ) {			//  проверяем - получен ли значимый ответ ???
			t.cl( 'Ошибка: ответ сервера не является объектом!' ); 	//	ой! - ответ не объект!
			alert( 'Ошибка: ответ сервера не является объектом!' ); //	ой! - ответ не объект!
		} else {
			t.X = X ;
			//  передача ответа на оформление
			t.show_JSON( X );
		//	$("#work_zone").html( t.decorate( X, t.templ_all ) );
			return X;
		};
/* */
	},	//  getting получение и обработка ответа сервера


	//  запрос JSON данных с сервера в JSON файле
	query_JSON(){
		t = this;
		// Date.now() - способ сделать каждый запрос уникальным, 
		// а значит отбить желание браузера брать содержимое файла из кэша
		let Url = "./data/list.json"+"?time="+Date.now(); 
		t.cl ( ' query: ' + Url + "\n-----------------" ) ;
		$.getJSON( Url, function( json ) { t.getting( json, Url ) ;});	//  обращение к серверу
	},
	//  запрос JSON данных с сервера у PHP сценария
	query_PHP(){
		t = this;
		let Url = "./data/js_json.php"; 
		t.cl ( ' query: ' + Url + "\n-----------------" ) ;
		$.getJSON( Url, function( json ) { t.getting( json, Url ) ;});	//  обращение к серверу
	},

// шаблон оформления информации в общем выводе 
		templ_all:  '<a class="rbt" title="#id#">'
		+'<div class="name"> #название# </div>'
		+'<div class="adress"> #город#, #улица# </div>'
		+'</a>',

// шаблон оформления информации в частном выводе
		templ_one: '<div class="one" >'
		+'<div><span class="name"> #вакансия# </span></div>'
		+'<div><span class="titl">режим работы - </span>'
		+'<span class="short"> #режим работы# </span></div>'
		+'<div><span class="titl">оплата: </span>'
		+'<span class="short"> #оплата#  </span></div>'
		+'<div><span class="titl">обязанности: </span></div>'
		+'<div><span class="long#">#обязанности# </span></div>'
		+'<div><span class="titl add_info">требования: </span></div>'
		+'<div class="long"> #требования# </div>'
		+'</div>'


};


function start(){
	console.log( "  start() " );
	/*
	List.query();

*/	

}
/*
$(document).ready(function(){
	console.log( "  это вход $(document).ready " );
});	
*/