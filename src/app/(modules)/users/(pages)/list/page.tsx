"use client";
import { DataTable } from "~/components/ui/basicTable";
import ColumnUser from "../../utils/columnsUser";
export default  function Page() {
 
  return (
    <div>
      <DataTable data={[]} columns={ColumnUser()} />
    </div>
  );
}