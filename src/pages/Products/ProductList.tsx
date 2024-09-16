import map from "lodash/map";
import React, { useEffect, useState } from "react";
import { Table, Tag, Alert, Input } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Product } from "../../types/Product";
import withLoadingIndicator from "../../HOC/WithLoadingIndicatorProps";
import useProductApi from "../../hooks/useProductApi";

const { Search } = Input;

const ProductList: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProductApi();
  const [filteredTags, setFilteredTags] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTagFilter = (tags: string[]) => {
    setFilteredTags(tags);
  };

  const filteredProducts = products.filter(
    (product) =>
      filteredTags.length === 0 ||
      filteredTags.some((tag) => product.tags.includes(tag))
  );

  const columns: ColumnsType<Product> = [
    {
      title: "Image",
      dataIndex: "media",
      key: "media",
      render: (media: File[]) => (
        <img
          src="https://i.pravatar.cc/50/50"
          alt="product"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "Product Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) =>
        title.length > 50 ? `${title.substring(0, 50)}...` : title,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {map(tags, (tag, index) => (
            <Tag color="blue" key={index}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <Search
        placeholder="Filter by tags"
        onSearch={(value) => handleTagFilter(value.split(","))}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={filteredProducts} rowKey="id" />
    </div>
  );
};

export default withLoadingIndicator(ProductList);
