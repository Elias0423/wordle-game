import ResponseDTO from '../types/responseDto';

export default class Controller {
  protected customResponse(code: number, message: string, content?: any): ResponseDTO {
    return new ResponseDTO(code, message, content);
  }

  protected successResponse(content: any): ResponseDTO {
    return new ResponseDTO(200, 'Información disponible', content);
  }

  protected notFoundResponse(content: any = []): ResponseDTO {
    return new ResponseDTO(200, 'No se encuentra información disponible', content);
  }

  protected badResponse(message: string): ResponseDTO {
    return new ResponseDTO(400, message, null);
  }

  protected failResponse(content: any): ResponseDTO {
    return new ResponseDTO(500, 'Ha ocurrido un error', content);
  }
}
