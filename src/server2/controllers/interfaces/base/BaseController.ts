import { IWriteController } from '../common/WriteController';
import { IBaseBusiness } from './../../../business/interfaces/base/BaseBusiness';
import { IReadController } from '../common/ReadController';

export interface IBaseController<T extends IBaseBusiness<Object>> extends IReadController, IWriteController {

}
