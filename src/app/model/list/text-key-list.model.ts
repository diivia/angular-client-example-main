import {TextKey} from "../text-key.model";
import {DtoList} from "./dto-list.model";

export interface TextKeyList extends DtoList {
  textKeys: TextKey[];
}
