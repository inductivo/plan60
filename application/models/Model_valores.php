<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_valores extends CI_Model{

	public function __construct(){
		parent::__construct();
	}

	public function obtener_valores($id_plan){
	   $this->db->where('id_plan', $id_plan);
	   $query = $this->db->get('valores');

     $arreglo= array();
    if($query->num_rows() > 0){
      foreach($query->result() as $registro){
        $arreglo[] = array(
          'id_valor'=>$registro->id_valor,
          'id_plan'=>$registro->id_plan,
					'inicial'=>$registro->inicial,
          'valor'=>$registro->valor
        );
      }
    }

    $json = json_encode($arreglo);
    echo $json;
  }

	public function obtener_ponderacion($id_valor){
		$this->db->where('id_valor', $id_valor);
		$this->db->from('valores');
		$query= $this->db->get()->row();

		$json = json_encode($query);
    echo $json;

	}

}//FIN
