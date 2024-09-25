document.querySelectorAll('.interactive-image').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {

        document.querySelectorAll('.enlarged-thumbnail').forEach(enlarged => {
            enlarged.classList.remove('enlarged-thumbnail');
        });
        document.querySelectorAll('.dish-info-description').forEach(description => {
            description.style.display = 'none';
        });


        this.classList.add('enlarged-thumbnail');
        const dishDescription = this.closest('li').querySelector('.dish-info-description');
        dishDescription.style.display = 'block';
    });
});
