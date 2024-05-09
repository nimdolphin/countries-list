import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import CountryDescription from "./componets/CountryDescription";
import CountriesList from "./componets/CountriesList";

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Content>
        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route path="country/:id" element={<CountryDescription />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
