// Select all Dom elements
const form = document.querySelector('#userForm');
const userName = document.querySelector('#name');
const roleInput = document.querySelector('#role');
const bio = document.querySelector('#bio');
const imgInput = document.querySelector('#img');
const cardDiv = document.querySelector('#cardDiv');
const toggleBtn = document.querySelector('#toggleForm');
const formWrapper = document.querySelector('#formWrapper');
const searchInput = document.querySelector('#searchInput');
const darkModeToggle = document.querySelector('#darkModeToggle');
const emptyState = document.querySelector('#emptyState');

let editIndex = null;

// Method usrMgmnt
const userMgmt = {
  users: [],

  init() {
    this.loadUsers();
    this.applySavedTheme();

    form.addEventListener('submit', this.submitForm.bind(this));
    toggleBtn.addEventListener('click', this.toggleForm.bind(this));
    searchInput.addEventListener('input', this.searchUser.bind(this));
    darkModeToggle.addEventListener('click', this.toggleDarkMode.bind(this));
    
    // Initial render
    this.renderUi(this.users);
  },

  toggleForm() {
    formWrapper.classList.toggle('hidden');
    toggleBtn.textContent = formWrapper.classList.contains('hidden')
      ? '+ Add User'
      : 'Cancel';
    toggleBtn.className = formWrapper.classList.contains('hidden')
      ? 'bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-lg transition-colors font-medium'
      : 'bg-gray-500 hover:bg-gray-600 text-white px-5 py-2.5 rounded-lg transition-colors font-medium';
  },

  submitForm(e) {
    e.preventDefault();
    editIndex === null ? this.addUser() : this.updateUser();
  },

  addUser() {
    this.users.push({
      userName: userName.value.trim(),
      role: roleInput.value.trim(),
      bio: bio.value.trim(),
      img: imgInput.value.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    });
    this.saveUsers();
    this.resetForm();
    this.renderUi(this.users);
  },

  updateUser() {
    this.users[editIndex] = {
      userName: userName.value.trim(),
      role: roleInput.value.trim(),
      bio: bio.value.trim(),
      img: imgInput.value.trim() || this.users[editIndex].img
    };
    editIndex = null;
    this.saveUsers();
    this.resetForm();
    this.renderUi(this.users);
  },

  removeUser(index) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users.splice(index, 1);
      this.saveUsers();
      this.renderUi(this.users);
    }
  },

  editUser(index) {
    const user = this.users[index];
    userName.value = user.userName;
    roleInput.value = user.role;
    bio.value = user.bio;
    imgInput.value = user.img;
    editIndex = index;
    formWrapper.classList.remove('hidden');
    toggleBtn.textContent = 'Cancel';
    toggleBtn.className = 'bg-gray-500 hover:bg-gray-600 text-white px-5 py-2.5 rounded-lg transition-colors font-medium';
  },

  searchUser() {
    const value = searchInput.value.toLowerCase().trim();
    const filtered = this.users.filter(user =>
      user.userName.toLowerCase().includes(value) ||
      user.role.toLowerCase().includes(value)
    );
    this.renderUi(filtered);
  },

  resetForm() {
    form.reset();
    editIndex = null;
    formWrapper.classList.add('hidden');
    toggleBtn.textContent = '+ Add User';
    toggleBtn.className = 'bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-lg transition-colors font-medium';
  },

  renderUi(users) {
    cardDiv.innerHTML = '';
    
    if (users.length === 0) {
      emptyState.classList.remove('hidden');
      return;
    }
    
    emptyState.classList.add('hidden');
    
    users.forEach((user, index) => {
      const card = document.createElement('div');
      card.className = `
        bg-white dark:bg-gray-800
        rounded-xl shadow-lg overflow-hidden
        border border-beige dark:border-gray-700
        transition-all duration-300 hover:shadow-xl
      `;

      card.innerHTML = `
        <div class="p-6">
          <div class="flex items-center mb-4">
            <img 
              src="${user.img}" 
              alt="${user.userName}"
              class="w-16 h-16 rounded-full object-cover border-2 border-beige dark:border-gray-600"
              onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'"
            >
            <div class="ml-4 text-left">
              <h3 class="text-xl font-semibold text-amber-900 dark:text-white">${user.userName}</h3>
              <p class="text-sm text-amber-700 dark:text-amber-400 font-medium">${user.role}</p>
            </div>
          </div>
          
          <p class="text-beige-dark dark:text-gray-300 text-sm leading-relaxed mb-6">${user.bio}</p>
          
          <div class="flex justify-end gap-3 pt-4 border-t border-beige dark:border-gray-700">
            <button class="editBtn bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 px-4 py-2 rounded-lg font-medium transition-colors">
              Edit
            </button>
            <button class="removeBtn bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 px-4 py-2 rounded-lg font-medium transition-colors">
              Delete
            </button>
          </div>
        </div>
      `;

      card.querySelector('.editBtn').addEventListener('click', () => this.editUser(index));
      card.querySelector('.removeBtn').addEventListener('click', () => this.removeUser(index));

      cardDiv.appendChild(card);
    });
  },

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  },

  loadUsers() {
    const data = JSON.parse(localStorage.getItem('users'));
    if (data) this.users = data;
  },

  toggleDarkMode() {
    const html = document.documentElement;
    const isDark = !html.classList.contains('dark');
    
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
      darkModeToggle.innerHTML = `
        <span>☀️</span>
        <span>Light Mode</span>
      `;
    } else {
      html.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
      darkModeToggle.innerHTML = `
        <span>🌙</span>
        <span>Dark Mode</span>
      `;
    }
  },

  applySavedTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    const html = document.documentElement;
    
    if (savedTheme === 'true') {
      html.classList.add('dark');
      darkModeToggle.innerHTML = `
        <span>☀️</span>
        <span>Light Mode</span>
      `;
    } else {
      html.classList.remove('dark');
      darkModeToggle.innerHTML = `
        <span>🌙</span>
        <span>Dark Mode</span>
      `;
    }
  }
};

// Initialize the app
userMgmt.init();