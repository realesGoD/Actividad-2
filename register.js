class UserManager {
  constructor() {
    this.userList = this.getUsers();
  }

  // Cargar o inicializar la lista de usuarios en localStorage
  getUsers() {
    let storedList = localStorage.getItem('userList');
    return storedList ? JSON.parse(storedList) : [];
  }

  // Guardar lista de usuarios en localStorage
  saveUsers() {
    localStorage.setItem('userList', JSON.stringify(this.userList));
  }

  // Función para agregar usuario al sistema
  addUserToSystem(name, surname, email, phone, dob, address, id, gender) {
    // Validar si la cédula ya existe
    if (this.userList.some(user => user.id === id)) {
      alert('El usuario con esta cédula ya existe.');
      return;
    }

    // Crear nuevo usuario
    let newUser = {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      dob: dob,
      address: address,
      id: id,
      gender: gender
    };

    // Agregar nuevo usuario a la lista
    this.userList.push(newUser);
    this.saveUsers();

    alert('Usuario registrado exitosamente.');
    this.displayUsers(); // Actualizar la tabla después de agregar el usuario
  }

  // Función para mostrar los usuarios en la tabla
  displayUsers() {
    let tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de mostrar los usuarios

    this.userList.forEach(user => {
      let row = `<tr>
                  <td>${user.name}</td>
                  <td>${user.surname}</td>
                  <td>${user.email}</td>
                  <td>${user.phone}</td>
                  <td>${user.dob}</td>
                  <td>${user.address}</td>
                  <td>${user.id}</td>
                  <td>${user.gender}</td>
                </tr>`;
      tableBody.innerHTML += row;
    });
  }

  // Función para cargar usuarios estáticos
  loadStaticUsers() {
    const staticUsers = [
      { name: 'Carlos', surname: 'Pérez', email: 'carlos@mail.com', phone: '3001234567', dob: '1990-01-01', address: 'Calle 123', id: '12345', gender: 'M' },
      { name: 'Ana', surname: 'López', email: 'ana@mail.com', phone: '3009876543', dob: '1985-05-15', address: 'Avenida 45', id: '54321', gender: 'F' },
      { name: 'Luis', surname: 'García', email: 'luis@mail.com', phone: '3016549876', dob: '1992-08-08', address: 'Carrera 10', id: '67890', gender: 'M' }
    ];
    
    this.userList = staticUsers; // Sobrescribe con usuarios estáticos
    this.displayUsers();
  }
}

// Instanciar el administrador de usuarios
const userManager = new UserManager();

// Manejar el envío del formulario
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Capturar los valores del formulario
  let name = document.getElementById('name').value;
  let surname = document.getElementById('surname').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let dob = document.getElementById('dob').value;
  let address = document.getElementById('address').value;
  let id = document.getElementById('id').value;
  let gender = document.getElementById('gender').value;

  // Llamar la función para agregar el usuario
  userManager.addUserToSystem(name, surname, email, phone, dob, address, id, gender);

  // Limpiar el formulario
  document.getElementById('registerForm').reset();
});

// Botón para cargar usuarios precargados
document.getElementById('loadUsers').addEventListener('click', function() {
  userManager.loadStaticUsers();
});

// Mostrar usuarios al cargar la página
window.onload = function() {
  userManager.displayUsers();
};
