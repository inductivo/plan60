<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Principal extends CI_Controller {

	function __construct(){
	parent::__construct();
	$this->load->model('Model_valores');
	$this->load->model('Model_indicadores');
	$this->load->model('Model_resultados');
}

	public function index(){
		$data['contenido'] = 'valores';
		$this->load->view('template',$data);
	}

	public function inicio(){
		$this->load->view('valores');
	}

	public function v1(){
		$this->load->view('test/v1');
	}

	public function resultados(){
		$this->load->view('resultados/index');
	}

	public function obtener_valores(){
		$id_plan= $_GET['id_plan'];
		$this->Model_valores->obtener_valores($id_plan);
	}

	public function obtener_indicadores(){
		$id_valor= $_GET['id_valor'];
		$this->Model_indicadores->obtener_indicadores($id_valor);
	}

	public function obtener_ponderacion(){
		$id_valor= $_GET['id_valor'];
 		$this->Model_valores->obtener_ponderacion($id_valor);
	}

	public function guardar_calificacion(){
		$id_plan= $_GET['id_plan'];
		$id_empresas= $_GET['id_empresas'];
		$id_valor= $_GET['id_valor'];
		$puntaje_obtenido= $_GET['puntaje_obtenido'];
		$calificacion= $_GET['calificacion'];
		$calificacion_ponderada = $_GET['calificacion_ponderada'];
		$porcentaje = $_GET['porcentaje'];

		$registro = array(
			'id_plan' => $id_plan,
			'id_empresas' => $id_empresas,
			'id_valor'	=> $id_valor,
			'puntaje_obtenido' => $puntaje_obtenido,
			'calificacion' => $calificacion,
			'calificacion_ponderada' => $calificacion_ponderada
		);

		$this->Model_indicadores->guardar_calificacion($registro,$porcentaje);
	}

	public function buscar_resultados(){
		$id_plan= $_GET['id_plan'];
		$id_empresas= $_GET['id_empresas'];
		$this->Model_resultados->buscar_resultados($id_plan,$id_empresas);
	}


}
