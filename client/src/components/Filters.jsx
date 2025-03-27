import React, { useState } from "react";
import featureCategories from "../constants/featureCategories";

const Filters = ({ filters, setFilters, sort, setSort }) => {
  const [openCategories, setOpenCategories] = useState([]);

  const toggleCategory = (category) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      const updatedFeatures = checked
        ? [...prev.features, value]
        : prev.features.filter((f) => f !== value);
      return { ...prev, features: updatedFeatures };
    });
  };

  return (
    <div className="mb-4">
      <div className="row mb-3">
        <div className="col-md-2">
          <input name="model" className="form-control" placeholder="Model" value={filters.model} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <input name="year" className="form-control" placeholder="Year" value={filters.year} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <input name="priceFrom" className="form-control" placeholder="Price From" value={filters.priceFrom} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <input name="priceTo" className="form-control" placeholder="Price To" value={filters.priceTo} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <select name="fuelType" className="form-select" value={filters.fuelType} onChange={handleChange}>
            <option value="">Fuel Type</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>Hybrid</option>
            <option>CNG</option>
          </select>
        </div>
        <div className="col-md-2">
          <select name="transmission" className="form-select" value={filters.transmission} onChange={handleChange}>
            <option value="">Transmission</option>
            <option>Manual</option>
            <option>Automatic</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2">
          <select name="condition" className="form-select" value={filters.condition} onChange={handleChange}>
            <option value="">Condition</option>
            <option>New</option>
            <option>Used</option>
          </select>
        </div>
        <div className="col-md-2">
          <input name="color" className="form-control" placeholder="Color" value={filters.color} onChange={handleChange} />
        </div>
      </div>

      <h5>Features:</h5>
      <div className="accordion" id="featuresAccordion">
        {Object.entries(featureCategories).map(([category, features], index) => (
          <div className="accordion-item" key={category}>
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button
                className={`accordion-button ${openCategories.includes(category) ? "" : "collapsed"}`}
                type="button"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${openCategories.includes(category) ? "show" : ""}`}
            >
              <div className="accordion-body">
                <div className="row">
                  {features.map((feature) => (
                    <div key={feature} className="col-6 mb-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={feature}
                          checked={filters.features.includes(feature)}
                          onChange={handleFeatureChange}
                          id={`feature-${feature}`}
                        />
                        <label className="form-check-label" htmlFor={`feature-${feature}`}>
                          {feature}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;