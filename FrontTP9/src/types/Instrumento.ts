import Categoria from "./Categoria";

class Instrumento  {
    id:string = "0";
    instrumento: string = "0";
	marca:string = "0";
	modelo:string = "0";
    imagen: string = "0";
    precio: number = 0;
    costoEnvio: string = "0";
    cantidadVendida: number = 0;
	descripcion:string = "0";
    eliminado: boolean = false;
    categoria: Categoria = new Categoria();
};

export default Instrumento;