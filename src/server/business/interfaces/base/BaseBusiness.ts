import { IRead } from '../common/Read';
import { IWrite } from '../common/Write';

export interface IBaseBusiness<T> extends IRead<T>, IWrite<T> { }

