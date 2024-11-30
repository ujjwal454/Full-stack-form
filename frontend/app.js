const formInput = document.querySelectorAll("input");
const submitBtn = document.querySelector(".submit");
const apiUrl = "https://full-stack-form.onrender.com/users/create";

let formValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function resetForm() {
  formInput.forEach((inp) => {
    inp.value = "";
  });

  formValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
}

formInput.forEach((inp) => {
  inp.addEventListener("input", (e) => {
    const inputValue = e.currentTarget.value;

    if (inp.id === "firstName") {
      formValues.firstName = inputValue;
    } else if (inp.id === "lastName") {
      formValues.lastName = inputValue;
    } else if (inp.id === "email") {
      formValues.email = inputValue;
    } else if (inp.id === "userName") {
      formValues.username = inputValue;
    } else if (inp.id === "password") {
      formValues.password = inputValue;
    } else if (inp.id === "confirmPassword") {
      formValues.confirmPassword = inputValue;
    }
  });
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validateFormValues() {
  if (!formValues.firstName) {
    alert("First name is required");
    return false;
  } else if (!formValues.lastName) {
    console.log(formValues.lastName);
    alert("Last name is required");
    return false;
  } else if (!formValues.username) {
    alert("username is required");
    return false;
  } else if (!validateEmail(formValues.email)) {
    alert("Enter a valid email address");
    return false;
  } else if (!formValues.password) {
    alert("Password is required");
    return false;
  } else if (!formValues.confirmPassword) {
    alert("confirm password is required");
    return false;
  } else if (formValues.password !== formValues.confirmPassword) {
    alert("password not match");
    return false;
  }
  return true;
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

function postUser() {
  submitBtn.textContent = "submitting...";
  submitBtn.disabled = true;
  fetch(apiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formValues, confirmPassword: undefined }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData?.error?.split("_").join(" ") + " " + errorData?.key);
        throw new Error(JSON.stringify(errorData));
      }
      return response.json();
    })
    .then((data) => {
      console.log("User posted successfully:", data);
      submitBtn.textContent = "Submit";
      submitBtn.disabled = false;
      resetForm();
      alert("response submitted successfully");
    })
    .catch((err) => {
      console.log("Error occurred while posting user:", err.response);
      submitBtn.textContent = "Submit";
      submitBtn.disabled = false;
    });
}

submitBtn.addEventListener("click", () => {
  const isValidInputValues = validateFormValues();
  if (isValidInputValues) {
    postUser();
  }
});
