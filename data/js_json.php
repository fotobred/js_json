<?php
/* Установка внутренней кодировки в UTF-8 */
mb_internal_encoding("UTF-8");
	
	// читаем .json
	$filename = __DIR__ . '/list.json';
//	$filename = './list.json';

	$fh = fopen($filename, 'r');		// открыли файл для чтения
	$text = file_get_contents($filename);	// забрали содержимое
	fclose($fh);						// закрыли файл 

	print_r( $text );	// отдали просителю	


?>
