import React from "react";
import { Transfer, Table } from "antd";

const TransferTable = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelect,
      selectedKeys: listSelectedKeys,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const handleSelectItem = (key, selected) => {
        new Promise((resolve, reject) => {
          if (listSelectedKeys.length) {
            onItemSelect(listSelectedKeys[0], false);
          }
          resolve();
        }).then(() => onItemSelect(key, selected));
      };

      const rowSelection = {
        type: "radio",
        onSelect({ key }, selected) {
          handleSelectItem(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          loading={restProps.loading}
          onRow={({ key }) => ({
            onClick: () => {
              handleSelectItem(key, true);
            },
          })}
        />
      );
    }}
  </Transfer>
);

export default TransferTable;
