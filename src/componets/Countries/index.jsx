import { Card, Typography } from "antd";

const Countries = ({ name, capital, flag, onClick }) => {
  return (
    <Card
      onClick={onClick}
      title={name.common}
      style={{ width: 300, margin: "16px" }}
    >
      <Typography.Text strong>{capital}</Typography.Text>
      <Typography>{flag}</Typography>
    </Card>
  );
};

export default Countries;
