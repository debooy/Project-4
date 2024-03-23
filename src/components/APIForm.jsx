import React, { useState } from "react";
import "./CatAPI.css";

const APIForm = () => {
  const [catData, setCatData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blacklist, setBlacklist] = useState({});

  const fetchRandomCat = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=live_1MZgSLXBnyrbUgUnAqzqiaUw8xqTVd1sb6I6lMqxnDY46q0ka12vf6P0SEtHUd66"
      );
      const data = await response.json();
      setCatData(data[0]);
    } catch (error) {
      setError("Error fetching cat data");
    }

    setIsLoading(false);
  };

  const handleBlacklist = (event, category, item) => {
    event.preventDefault();
    setBlacklist((prevBlacklist) => ({
      ...prevBlacklist,
      [category]: [...(prevBlacklist[category] || []), item],
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!catData) {
    return (
      <div>
        <button onClick={fetchRandomCat}>Fetch Random Cat</button>
      </div>
    );
  }

  const breed =
    catData.breeds && catData.breeds.length > 0 ? catData.breeds[0] : null;

  if (breed) {
    const isBlacklisted =
      (blacklist.name && blacklist.name.includes(breed.name)) ||
      (blacklist.origin && blacklist.origin.includes(breed.origin)) ||
      (blacklist.weight && blacklist.weight.includes(breed.weight.metric)) ||
      (blacklist.lifeSpan && blacklist.lifeSpan.includes(breed.life_span));

    if (isBlacklisted) {
      return (
        <div>
          <p>This cat matches the blacklisted criteria.</p>
          <button onClick={fetchRandomCat}>Fetch New Random Cat</button>
        </div>
      );
    }
  }

  return (
    <div className="container">
      <div className="cat-info">
        <h2>Random Cat</h2>
        <img src={catData.url} alt="Cat" width="400" height="400" />
        {breed ? (
          <>
            <p>
              Name: {breed.name}{" "}
              <button
                onClick={(event) => handleBlacklist(event, "name", breed.name)}
              >
                Blacklist
              </button>
            </p>
            <p>
              Origin: {breed.origin}{" "}
              <button
                onClick={(event) =>
                  handleBlacklist(event, "origin", breed.origin)
                }
              >
                Blacklist
              </button>
            </p>
            <p>
              Weight: {breed.weight.metric} kg{" "}
              <button
                onClick={(event) =>
                  handleBlacklist(event, "weight", breed.weight.metric)
                }
              >
                Blacklist
              </button>
            </p>
            <p>
              Life Span: {breed.life_span} years{" "}
              <button
                onClick={(event) =>
                  handleBlacklist(event, "lifeSpan", breed.life_span)
                }
              >
                Blacklist
              </button>
            </p>
          </>
        ) : (
          <p>No breed information available</p>
        )}
        <button onClick={fetchRandomCat}>Fetch New Random Cat</button>
      </div>
      <div className="blacklist">
        <h3>Blacklisted Items:</h3>
        {Object.entries(blacklist).map(([category, items]) => (
          <div key={category}>
            <h4>{category}:</h4>
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default APIForm;
