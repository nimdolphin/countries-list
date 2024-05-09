import { Typography, List, Image, Spin } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import placeholderImage from "../../assets/img/placeholderImage.svg";

const CountryDescription = () => {
  const { id } = useParams();

  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`https://restcountries.com/v3.1/name/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw Error("Oops, something is wrong..");
          }
          return response.json();
        })
        .then((data) => {
          setCountry(data);
          setError(null);
        })
        .catch((error) => {
          setError(error, "Failed to fench data");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [id]);

  return (
    <>
      <Spin spinning={loading} style={{ marginTop: "50px" }}>
        {error && <Typography>Error: {error.message}</Typography>}
        {!loading && !error && (
          <List
            itemLayout="vertical"
            dataSource={country}
            style={{
              textAlign: "center",
              margin: "30px auto",
              maxWidth: "600px",
            }}
          >
            {country?.map(
              ({ name, latlng, capital, altSpellings, flag, coatOfArms }) => (
                <List.Item
                  key={latlng}
                  style={{
                    padding: "10px",
                  }}
                >
                  <List.Item.Meta
                    style={{ justifyContent: "center", textAlign: "left" }}
                    avatar={
                      coatOfArms.png ? (
                        <Image src={coatOfArms.png} alt="country" width={200} />
                      ) : (
                        <Image
                          src={placeholderImage}
                          alt="placeholder"
                          width={200}
                        />
                      )
                    }
                    title={<Typography>{name.common}</Typography>}
                    description={
                      <>
                        <Typography>{capital}</Typography>
                        <Typography>{altSpellings.join(", ")}</Typography>
                        <Typography>{flag}</Typography>
                      </>
                    }
                  />
                </List.Item>
              )
            )}
          </List>
        )}
      </Spin>
    </>
  );
};

export default CountryDescription;
