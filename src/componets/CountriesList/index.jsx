import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import Countries from "../Countries";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleNavigationCountry = (id) => () => {
    navigate(`country/${id}`);
  };

  useEffect(() => {
    try {
      fetch(`https://restcountries.com/v3.1/all`)
        .then((response) => {
          if (!response.ok) {
            throw Error("Oops, something is wrong..");
          }
          return response.json();
        })
        .then((data) => {
          setCountries(data);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          setLoading(false);
          setError(error, "Failed to fench data");
        });
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }, []);

  return (
    <>
      <Spin spinning={loading} style={{ marginTop: "50px" }}>
        {error && <div>Error: {error} </div>}
        {!countries?.length && !loading && <div>No countries found</div>}
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {countries?.map(({ name, capital, flag, latlng, altSpellings }) => (
            <Col
              span={5}
              key={latlng}
              style={{ margin: "0 20px", cursor: "pointer" }}
            >
              <Countries
                name={name}
                capital={capital}
                altSpellings={altSpellings}
                flag={flag}
                onClick={handleNavigationCountry(name.common)}
              />
            </Col>
          ))}
        </Row>
      </Spin>
    </>
  );
};

export default CountriesList;
