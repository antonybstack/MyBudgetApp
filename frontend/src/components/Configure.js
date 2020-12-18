import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Form } from "react-bootstrap";

const Configure = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const target = useRef(null);

  const [monthlyBudgetTotal, setMonthlyBudgetTotal] = useState(user.monthly_budget_total);
  const { categories, setCategories } = useContext(CategoryContext);

  useEffect(() => {
    setMonthlyBudgetTotal(user.monthly_budget_total);
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (e.target.className === "category form-control") {
      // checks if user is typing into category name text input
      categories.forEach((category, index) => {
        // loops through category state and finds category name to change after user types
        if (name == category._id) {
          const newCategories = categories.slice();
          newCategories.splice(index, 1, {
            ...category, //remove 1 element before 'index' and insert the following)
            category_name: value,
          });
          setCategories(newCategories);
        }
        return null;
      });
    } else {
      // otherwise user is typing into monthly budget text input
      setMonthlyBudgetTotal(value);
    }
  };

  const handleSubmit = (e) => {
    // user submitting saves all fields and updates/adds to database
    e.preventDefault();

    const packet = {
      monthly_budget_total: monthlyBudgetTotal,
    };

    // UPDATES MONTHLY BUDGET
    axios
      .post("api/users/update/" + user._id, packet)
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        //setMessage(error.response.data.message);
      });

    // ADDS/UPDATES NEW CATEGORIES
    categories.forEach((category, index) => {
      if (category.category_name !== "") {
        if (category._id.toString().length === 5) {
          // ADDS NEW CATEGORIES
          // categories that arent already in the database have a temporary 5 digit _id (see addCategory)
          const newCategory = {
            category_name: category.category_name,
            category_year: category.category_year,
            created_by: category.created_by,
          };

          axios
            .post("api/categories/add", newCategory)
            .then((res) => {
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          // UPDATES EXISTING CATEGORIES
          const updatedCategory = {
            category_name: category.category_name,
            category_year: category.category_year,
            created_by: category.created_by,
          };

          axios
            .post("api/categories/update/" + category._id, updatedCategory)
            .then((res) => {
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      }
      return null;
    });
  };

  const addCategory = (e) => {
    // adds new input field html element for new category
    let randomID = Math.floor(Math.random() * 90000) + 10000; // generates random 5 digit number for html element id
    do {
      var randomIDNotUnique = false;
      categories.forEach((category, index) => {
        if (category._id == randomID) {
          randomIDNotUnique = true;
        }
      });
    } while (randomIDNotUnique === true);
    e.preventDefault();
    var d = new Date();
    var currentYear = d.getFullYear();
    setCategories((currentCategories) => [...currentCategories, { _id: randomID, category_name: "", category_year: currentYear.toString(), created_by: user._id }]);
  };

  const deleteCategory = (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (e.target.attributes.getNamedItem("idx").value.length === 0) {
      categories.forEach((t, index) => {
        if (t._id.toString() === name) {
          const i = index;
          const newCategories = categories.slice();
          newCategories.splice(i, 1); //remove 1 element before 'index' (3rd parameter is empty because we dont want to insert anything)
          setCategories(newCategories);
        }
      });
    } else {
      axios.delete("api/categories/delete/" + name).then((res) => {
        categories.forEach((t, index) => {
          if (t._id === name) {
            const i = index;
            const newCategories = categories.slice();
            newCategories.splice(i, 1); //remove 1 element before 'index' (3rd parameter is empty because we dont want to insert anything)
            setCategories(newCategories);
          }
        });
      });
    }
  };

  const authOpen = () => {
    return (
      <div className="Configure">
        <div className="cardHeader">Configure</div>
        <Form inline onSubmit={handleSubmit} onChange={handleChange}>
          <div className="form">
            <label for="montlyBudgetTotal">Monthly Budget Total:&nbsp;</label>
            $<input type="text" name="monthly_budget_total" id="monthly_budget_total" ref={target} value={monthlyBudgetTotal} autoComplete="off" />
            <br />
            <div>List of categories:</div>
            {categories &&
              categories.map(
                (currentCategory, idx) =>
                  currentCategory.created_by === user._id && (
                    <div className="categoryContainer">
                      <input type="text" name={currentCategory._id} data-id={idx} id={idx} value={currentCategory.category_name} className="category form-control"></input>
                      <button className="btn btn-danger" name={currentCategory._id} idx={currentCategory.category_name} onClick={deleteCategory}>
                        remove
                      </button>
                    </div>
                  )
              )}
            <button className="btn btn-primary category" onClick={addCategory}>
              Add new category
            </button>
            <br />
            <button className="btn btn-info category" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    );
  };

  const notAuthOpen = () => {
    return <div className="notLoggedInMessage">Must be logged in to configure your account.</div>;
  };

  return (
    <>
      {isAuthenticated && authOpen()}
      {!isAuthenticated && notAuthOpen()}
    </>
  );
};

export default Configure;
