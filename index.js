const productsContainer = document.querySelector(".products-container");
const searchField = document.querySelector(".search-field ");

const displayProducts = (arrayData) => {
  productsContainer.innerHTML = "";

  arrayData.forEach((element) => {
    productsContainer.insertAdjacentHTML( //src ถ้าชื่อๆไม่เหมือนต้องเปลี่ยน
      "beforeend",
      `<div class="product-card">
            <img
              src="${element.image}"   
              alt="img"
            />
            <div class="card-content">
              <h3>${element.category}</h3>
              <p>${element.title}</p>
            </div>
            <div class="card-footer">
              <div>${element.id}</div>
              <div>$ ${element.price}</div>
            </div>
          </div>`
    );
  });
};

const getData = async () => {
  const response = await fetch("https://fakestoreapi.com/products"); //api ขึ้นอยู่กับโจทย์ให้มา
  const responseJson = await response.json();

  console.log(responseJson);
  displayProducts(responseJson);
  //เอาไว้ค้นหา
  searchField.addEventListener("input", (event) => {
    const { value } = event.target; //เเปลงให้ตัวเล็กก่อนเสมอ

    const filter = responseJson.filter((el) => {
      //   return el.title.toLowerCase() === value.toLowerCase();
      return (
        el.category.toLowerCase().includes(value.toLowerCase()) || //หรือ
        el.description.toLowerCase().includes(value.toLowerCase())
      );
    });

    displayProducts(filter);
  });
};

getData();