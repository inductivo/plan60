<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_indicadores extends CI_Model{

	public function __construct(){
		parent::__construct();
	}

	public function obtener_indicadores($id_valor){
	  $this->db->where('id_valor', $id_valor);
	  $query = $this->db->get('indicadores');

    $arreglo= array();
     if($query->num_rows() > 0){
      foreach($query->result() as $registro){
        $arreglo[] = array(
          'id_valor'=>$registro->id_indicadores,
          'id_plan'=>$registro->id_plan,
          'id_valor'=>$registro->id_valor,
					'indicador'=>$registro->indicador
        );
      }
    }
    $json = json_encode($arreglo);
    echo $json;
  }

	public function guardar_calificacion($registro,$porcentaje){

		$this->db->set($registro);
		$this->db->insert('calificaciones');

		$this->db->select_max('id_calificaciones');
    $this->db->from('calificaciones');
    $query = $this->db->get()->row();

		//Se agregan los datos a la tabla Porcentaje
		$registro_porcentaje = array(
			'id_calificaciones' => $query->id_calificaciones,
			'porcentaje' => $porcentaje
		);

		$this->db->set($registro_porcentaje);
		$this->db->insert('porcentaje');

	}

}//FIN
