import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Form } from "react-bootstrap";

const EditBudgets = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const target = useRef(null);
  const [monthlyBudgetTotal, setMonthlyBudgetTotal] = useState(user.monthly_budget_total);
  const { categories, setCategories } = useContext(CategoryContext);
  const [currentMonth, setCurrentMonth] = useState(0);

  useEffect(() => {
    setMonthlyBudgetTotal(user.monthly_budget_total);
    var d = new Date();
    var monthResult = d.getMonth();
    setCurrentMonth(monthResult);
  }, [isAuthenticated]);

  const handleChange = (e) => {
    var { value, name } = e.target;
    if (value == "" || isNaN(value)) value = "0"; // ensures the input is not empty at any point
    if (e.target.className === "category form-control") {
      categories.forEach((category, index) => {
        if (name == category._id) {
          const newCategories = categories.slice();
          newCategories.splice(index, 1, {
            ...category, //remove 1 element before 'index' and insert the following)
            category_totals: {
              ...category.category_totals,
              [currentMonth]: parseInt(value),
            },
          });
          setCategories(newCategories);
        }
        return null;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    categories.forEach((category) => {
      const updatedCategory = {
        category_name: category.category_name,
        category_year: category.category_year,
        created_by: category.created_by,
        category_totals: Object.values(category.category_totals),
      };

      axios
        .post("api/categories/update/" + category._id, updatedCategory)
        .then((res) => {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
      return null;
    });
  };

  const onRadioChange = (e) => {
    setCurrentMonth(parseInt(e.target.value));
  };

  const authOpen = () => {
    return (
      <div className="Configure">
        <div className="cardHeader">Edit Budgets</div>
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <div className="monthSelection">
            <Form.Check checked={currentMonth === 0} value="0" onChange={onRadioChange} inline label="Jan" type={"radio"} className="inlineRadio" id="inline-radio-0" />
            <Form.Check checked={currentMonth === 1} value="1" onChange={onRadioChange} inline label="Feb" type={"radio"} className="inlineRadio" id="inline-radio-1" />
            <Form.Check checked={currentMonth === 2} value="2" onChange={onRadioChange} inline label="Mar" type={"radio"} className="inlineRadio" id="inline-radio-2" />
            <Form.Check checked={currentMonth === 3} value="3" onChange={onRadioChange} inline label="Apr" type={"radio"} className="inlineRadio" id="inline-radio-3" />
            <Form.Check checked={currentMonth === 4} value="4" onChange={onRadioChange} inline label="May" type={"radio"} className="inlineRadio" id="inline-radio-4" />
            <Form.Check checked={currentMonth === 5} value="5" onChange={onRadioChange} inline label="Jun" type={"radio"} className="inlineRadio" id="inline-radio-5" />
            <Form.Check checked={currentMonth === 6} value="6" onChange={onRadioChange} inline label="Jul" type={"radio"} className="inlineRadio" id="inline-radio-6" />
            <Form.Check checked={currentMonth === 7} value="7" onChange={onRadioChange} inline label="Aug" type={"radio"} className="inlineRadio" id="inline-radio-7" />
            <Form.Check checked={currentMonth === 8} value="8" onChange={onRadioChange} inline label="Sep" type={"radio"} className="inlineRadio" id="inline-radio-8" />
            <Form.Check checked={currentMonth === 9} value="9" onChange={onRadioChange} inline label="Oct" type={"radio"} className="inlineRadio" id="inline-radio-9" />
            <Form.Check checked={currentMonth === 10} value="10" onChange={onRadioChange} inline label="Nov" type={"radio"} className="inlineRadio" id="inline-radio-10" />
            <Form.Check checked={currentMonth === 11} value="11" onChange={onRadioChange} inline label="Dec" type={"radio"} className="inlineRadio" id="inline-radio-11" />
          </div>
          <div className="form-inline">
            <span>Monthly Budget Total:</span>
            <div type="text" name="monthly_budget_total" id="monthly_budget_total" ref={target}>
              &nbsp;${monthlyBudgetTotal}
            </div>
            <div>List of categories:</div>
            <table>
              {categories &&
                categories.map(
                  (currentCategory, idx) =>
                    currentCategory.created_by === user._id && (
                      <div className="categoryContainer">
                        <div id={currentCategory._id} className="category">
                          <td className="categoryName">{currentCategory.category_name}:</td>
                          <td>
                            &nbsp;&nbsp;$
                            <input type="text" name={currentCategory._id} data-id={idx} id={idx} value={currentCategory.category_totals[currentMonth]} className="category form-control"></input>
                          </td>
                        </div>
                      </div>
                    )
                )}
            </table>
            <button className="btn btn-info category edit" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    );
  };

  const notAuthOpen = () => {
    return <div className="notLoggedInMessage">Must be logged in to input your spending.</div>;
  };

  return (
    <>
      {isAuthenticated && authOpen()}
      {!isAuthenticated && notAuthOpen()}
    </>
  );
};

export default EditBudgets;
