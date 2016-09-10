<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Model_resultados extends CI_Model{

	public function __construct(){
		parent::__construct();
	}

public function buscar_resultados($id_plan,$id_empresas){
  $this->db->select('calificaciones.*, valores.*');
  $this->db->from('calificaciones');
  $this->db->join('valores','calificaciones.id_valor = valores.id_valor','inner');
  $this->db->where('calificaciones.id_plan', $id_plan);
  $this->db->where('calificaciones.id_empresas', $id_empresas);
  $query = $this->db->get();

  $arreglo= array();
   if($query->num_rows() > 0){
     foreach($query->result() as $registro){
       $arreglo[] = array(
         'id_calificaciones' => $registro->id_calificaciones,
         'id_plan' => $registro->id_plan,
         'id_empresas' => $registro->id_empresas,
         'id_valor' => $registro->id_valor,
         'puntaje_obtenido' => $registro->puntaje_obtenido,
         'calificacion' => $registro->calificacion,
         'calificacion_ponderada' => $registro->calificacion_ponderada,
         'valor' => $registro->valor,
         'ponderacion' => $registro->ponderacion,
         'puntaje_total' => $registro->puntaje_total
       );
     }
   }

   $json = json_encode($arreglo);
   echo $json;
}

}//FIN
