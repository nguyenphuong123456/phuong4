document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById("myModal");
  var btns = document.querySelectorAll(".btn");
  var span = document.getElementsByClassName("close")[0];
  var menuItems = document.querySelectorAll('nav ul li a');
  var cart = []; // Mảng để lưu các sản phẩm trong giỏ hàng

  // Mở modal khi click vào nút
  btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      modal.style.display = "block";
    });
  });

  // Đóng modal khi click vào nút đóng (x)
  span.onclick = function() {
    modal.style.display = "none";
  };

  // Đóng modal khi click bên ngoài modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Thêm sản phẩm vào giỏ hàng
  function addToCart(product) {
    cart.push(product);
    updateCart();
  }

  // Xóa sản phẩm khỏi giỏ hàng
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }

  // Cập nhật giỏ hàng và tổng bill
  function updateCart() {
    var cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = ''; // Xóa hết các sản phẩm hiện tại trong giỏ hàng

    var total = 0;

    cart.forEach(function(item, index) {
      var itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.price.toFixed(2)} k</p>
          <button class="remove-btn" data-index="${index}">Xóa</button>
        </div>
      `;
      cartItems.appendChild(itemElement);
      total += item.price;
    });

    // Hiển thị tổng bill
    var totalElement = document.getElementById('total');
    totalElement.textContent = total.toFixed(2);
    
    // Bắt sự kiện click vào nút "Xóa"
    var removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        var index = parseInt(button.getAttribute('data-index'));
        removeFromCart(index);
      });
    });
  }

  // Bắt sự kiện khi người dùng click vào nút "Thêm vào giỏ hàng"
  var addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var product = {
        name: button.parentNode.querySelector('h3').textContent,
        price: parseFloat(button.parentNode.querySelector('p').textContent),
        image: button.parentNode.querySelector('img').getAttribute('src')
      };
      addToCart(product);
      closeModal();
    });
  });

  // Xử lý đặt hàng
  var orderForm = document.getElementById('order-form');
  orderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var quantity = parseInt(document.getElementById('quantity').value);
    
    // Xử lý đơn hàng ở đây, ví dụ hiển thị thông báo
    alert(`Đơn hàng của ${name} đã được đặt thành công!`);
    cart = []; // Xóa giỏ hàng sau khi đặt hàng thành công
    updateCart(); // Cập nhật lại giỏ hàng
    orderForm.reset(); // Reset form đặt hàng
    closeModal(); // Đóng modal
  });

  // Hàm đóng modal
  function closeModal() {
    modal.style.display = 'none';
  }

  // Smooth scroll đến section khi click vào menu
  menuItems.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('href').substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});


