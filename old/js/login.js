$(function() {
    $("#loginForm input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var password = $("input#pass").val();

            $.ajax({
                url: "https://projectpep.herokuapp.com/users/login",
                type: "POST",
                data: {
                    username: name,
                    password: password,
                },
                success: function(data) {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Logged in successful. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                        console.log(data);

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Something went wrong.");
                    $('#success > .alert-danger').append('</div>');
                    
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        }
    });

});