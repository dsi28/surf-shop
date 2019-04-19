//find form
let postEditForm = document.getElementById('postEditForm');
//add submit listener to the post edit form
postEditForm.addEventListener('submit', function(event){
    //find length of uploaded images
    let imageUpload = document.getElementById('imageUpload').files.length;
    //current lenghth of uploaded images
    let existingImgs = document.querySelectorAll('.imageDeleteCheckbox').length;
    //length of images to be deleted
    let imgDeletions = document.querySelectorAll('.imageDeleteCheckbox:checked').length;
    let newTotal  = existingImgs - imgDeletions +imageUpload;
    if(newTotal >4){
        event.preventDefault();
        let showTotal = newTotal-4;
        alert(`You need to remove atleast ${showTotal} (more) image${showTotal == 1 ? '': 's'}`);
    }
});