
  var id_plan = 1;
  var id_empresas = 1;
  obtenerValores(id_plan,imprimirValores);

  function obtenerValores(id_plan,imprimirValores){
    $.ajax({
			data: {
				format: 'jsonp',
				method: 'get',
				id_plan: id_plan
			},
			url: 'principal/obtener_valores',
      beforeSend: function(){
        var loader = '<div class="col-lg-12 text-center">Cargando...</div>';
        $('#loading').append(loader);
      },
      complete: function(){
        $('#loading').remove();
      }
		}).done(imprimirValores);
  }

  function imprimirValores(jsonData){
    $('#box-main').html('');
    $valores = JSON.parse(jsonData);

    if($valores.length > 0){
      for(var i=0; i<$valores.length; i++){
        var title = '<div id="valor'+(i+1)+'" class="col-lg-12 box-values" data-id="'+$valores[i].id_valor+'"><div class="col-lg-3 col-sm-3 text-center" id="inicial-valor"><h3 class="inicial-valor">'+$valores[i].id_valor+'<h3></div><div class="col-lg-9 col-sm-9" id="nombre-valor"><h3 class="nombre-valor">'+$valores[i].valor+'</h3></div></div>';
        //var id_plan_hidden = '<div><input type="hidden" id="idplan" value="'+$valores[i].id_plan+'"></input></div>';
        $('#box-main').append(title);
        $('#valor'+(i+1)).on('click',indicadores1);
      }

      var button_inicio = '<div class="row"><div class="col-lg-12 text-center">';
      var button = '<button id="btn-resultados" type="button" class="btn btn-primary btn-lg">Resultados</button>';
      var button_fin = '</div></div>';
      $('#box-button').append(button_inicio+button+button_fin);
    }
    $('#btn-resultados').on('click',buscarResultados);
  }
    function buscarResultados(){
      $('#main').load('principal/resultados');
      mostrarResultados(id_plan,id_empresas,imprimirResultados);
    }

    function mostrarResultados(id_plan,id_empresas,imprimirResultados){
      $.ajax({
  			data: {
  				format: 'jsonp',
  				method: 'get',
  				id_plan: id_plan,
          id_empresas: id_empresas
  			},
  			url: 'principal/buscar_resultados',
        beforeSend: function(){
          var loader = '<div class="col-lg-12 text-center">Cargando...</div>';
          $('#loading').append(loader);
        },
        complete: function(){
          $('#loading').remove();
        }
  		}).done(imprimirResultados);
    }

    function imprimirResultados(jsonData){
      var calificacion_final = 0;
      $resultados = JSON.parse(jsonData);

      if($resultados.length > 0){

        for(var i=0; i<$resultados.length;i++){
          var td0 = '<tr><td class="text-center">'+(i+1)+'</td>';
          var td1 = '<td>'+$resultados[i].valor+'</td>';
          var td2 = '<td class="text-center">'+$resultados[i].puntaje_obtenido+'</td>';
          var td3 = '<td class="text-center">'+$resultados[i].calificacion+'</td>';
          var td4 = '<td class="text-center">'+$resultados[i].ponderacion+'</td>';
          var td5 = '<td class="text-center">'+$resultados[i].calificacion_ponderada+'</td></tr>';
          console.log(calificacion_final);
          calificacion_final = parseFloat(calificacion_final + parseFloat($resultados[i].calificacion_ponderada));
          $('#table-resultados').append(td0+td1+td2+td3+td4+td5);
        }

          var cf = '<div class="col-lg-12"><h3>Calificación Final:  '+calificacion_final.toFixed(2)+'</h3></div>';
          if(calificacion_final >= 7){
            var res = '<div class="col-lg-12"><h3>Resultado: VIABLE </h3></div>';
          }else{
            var res = '<div class="col-lg-12"><h3>Resultado: NO VIABLE </h3></div>';
          }

          var btn_grafica = '<div class="col-lg-12 text-center"><button type="button" class="btn btn-lg btn-warning">Ver gráfica</button></div>';
          $('#box-resultados').append(cf+res+btn_grafica);
      }

    }

    function indicadores1(){
      var id_valor = $(this).attr('data-id');
      $('#main').load('principal/v1');
      testV1(id_valor,imprimirIndicadores);
    }

    function testV1(id_valor,imprimirIndicadores){
      $.ajax({
  			data: {
  				format: 'jsonp',
  				method: 'get',
  				id_valor: id_valor
  			},
  			url: 'principal/obtener_indicadores',
        beforeSend: function(){
          var loader = '<div class="col-lg-12 text-center">Cargando...</div>';
          $('#loading').append(loader);
        },
        complete: function(){
          $('#loading').remove();
        }
  		}).done(imprimirIndicadores);
    }

    function imprimirIndicadores(jsonData){
      $indicador = JSON.parse(jsonData);
      var idvalor = '<input id="id_valor" name="id_valor" type="hidden" value="'+$indicador[0].id_valor+'">';
      $('#box-question').append(idvalor);

      if($indicador.length > 0){
        var title = '<h3>Nombre del Valor</h3>';
        $('#title-valor').append(title);

        for(var i=0; i<$indicador.length;i++){
          var inicio = '<div class="col-lg-12 box-question">';
          var indicador =  '<p>'+$indicador[i].indicador+'</p>';
          var q0 = '<label class="radio-inline"><input type="radio" name="q'+i+'" value="0" id="r0" checked="checked">0</label>';
          var q1 = '<label class="radio-inline"><input type="radio" name="q'+i+'" value="1" id="r1">1</label>';
          var q2 = '<label class="radio-inline"><input type="radio" name="q'+i+'" value="2" id="r2">2</label>';
          var q3= '<label class="radio-inline"><input type="radio" name="q'+i+'" value="3" id="r3">3</label>';
          var q4= '<label class="radio-inline"><input type="radio" name="q'+i+'" value="4" id="r4">4</label>';
          var fin ='</div>';
          $('#box-question').append(inicio+indicador+q0+q1+q2+q3+q4+fin);
        }

        var btn_inicio='<div class="row botones"><div class="col-lg-12">';
        var btnC='<button type="button" class="btn btn-danger">Cancelar</button>';
        var btnG ='<button id="guardar" type="button" class="btn btn-success">Guardar</button>';
        var btn_fin = '</div></div>';
        $('#box-question').append(btn_inicio+btnC+btnG+btn_fin);
      }

      $('#guardar').on('click',calcularPuntaje);

    }

  function calcularPuntaje(){
    var arreglo = [];
    var puntaje_obtenido = 0;
    for(var i=0; i<$indicador.length;i++){
      var puntos = parseInt($('input:radio[name=q'+i+']:checked').val());
      //arreglo.push($('input:radio[name=q'+i+']:checked').val());
      puntaje_obtenido = puntaje_obtenido + puntos;
    }
    var po = '<input id="puntaje_obtenido" type="hidden" value="'+puntaje_obtenido+'">';
    $('#puntos_obtenidos').append(po);

    var idvalor=$('#id_valor').val();
    obtenerPonderacion(idvalor,calcularCalificacion);
  }

  function obtenerPonderacion(id_valor,calcularCalificacion){
    $.ajax({
      data: {
        format: 'jsonp',
        method: 'get',
        id_valor: id_valor
      },
      url: 'principal/obtener_ponderacion',
      beforeSend: function(){
        var loader = '<div class="col-lg-12 text-center">Cargando...</div>';
        $('#loading').append(loader);
      },
      complete: function(){
        $('#loading').remove();
      }
    }).done(calcularCalificacion);
  }

  function calcularCalificacion(jsonData){
    $datos = JSON.parse(jsonData);
    var puntos_obtenidos = $('#puntaje_obtenido').val();
    var calificacion = parseFloat((puntos_obtenidos*10)/$datos.puntaje_total);
    var calificacion_ponderada = parseFloat(($datos.ponderacion*0.01)*calificacion);
    var porcentaje = Math.round((puntos_obtenidos*100)/$datos.puntaje_total);
    var id_valor = $('#id_valor').val();

    guardarCalificacion(id_plan,id_empresas,id_valor,puntos_obtenidos,calificacion,calificacion_ponderada,porcentaje,confirmarCalificacion);

    console.log("Puntos obtenidos: "+ puntos_obtenidos);
    console.log("Calificacion: "+ calificacion);
    console.log("Cal Ponderada: "+ calificacion_ponderada);
    console.log("Porcentaje: "+ Math.round(porcentaje));

  }

  function guardarCalificacion(id_plan,id_empresas,id_valor,puntaje_obtenido,calificacion,calificacion_ponderada,porcentaje,confirmarCalificacion){
    $.ajax({
      data: {
        format: 'jsonp',
        method: 'get',
        id_plan: id_plan,
        id_empresas: id_empresas,
        id_valor: id_valor,
        puntaje_obtenido: puntaje_obtenido,
        calificacion: calificacion,
        calificacion_ponderada: calificacion_ponderada,
        porcentaje : porcentaje
      },
      url: 'principal/guardar_calificacion',
      beforeSend: function(){
        var loader = '<div class="col-lg-12 text-center">Cargando...</div>';
        $('#loading').append(loader);
      },
      complete: function(){
        $('#loading').remove();
      }
    }).done(confirmarCalificacion);
  }

  function confirmarCalificacion(){
    $('#main').load('principal/inicio');
  }
