import qs from "query-string";
import { OperationLogItem, OperationLog } from "@/models/OperationLog";
import request from "./request";

export default async (operationLogItems: Array<OperationLogItem>) => {
  let parsed = qs.parse(parent.location.search);
  let url = `_api/InlineEditor/Update?SiteId=${parsed["SiteId"]}`;
  let operationLog = new OperationLog(operationLogItems, parsed[
    "pageId"
  ] as string);
  await request.post(url, operationLog);
};
