$(document).ready(function () {
    /* Chama a funÃ§Ã£o para popular combobox de Paises */
    pais()
    /* Fim */

    /* Coloca a mascara nos campos de Telefone e CPF */
    $("#phone").mask("(99)9999-9999?9");
    $("#cpf").mask("999.999.999-99");
    /* Fim */

    /* AÃ§Ãµes quando o primeiro form, de paÃ­ses, for submetido */
    $("#formCountry").submit(function () {
        $(".message").empty();
        /* Recebe o pais selecionado */
        var pais = $("#country").val();
        /* SenÃ£o tiver sido selecionado nenhum, emite o alerta */
        if (pais === "") {
            $(".message").html("<div class='alert alert-warning'><center><big>Escolha um paÃ­s</big></center></div>");
        }
        /* Se nÃ£o for paÃ­s Brasil */
        else if (pais !== "BR") {
            /* Renomeia os Steps e adiciona classe */
            $("#1").html('<a href="#">Country</a>');
            $("#2").removeClass('disabled').addClass('active').html('<a href="#">Contact</a>');
            $("#3").hide();
            $("#4").html('<a href="#">Success</a>');

            /* Guarda o pais */
            $.ajax({
                url: './php/open-business.php',
                type: 'POST',
                data: 'action=outCountry1&country='+pais,
                success: function(){
                    /* Esconde o primero formulÃ¡rio e mostra o segundo formulÃ¡rio para pessoas fora do Brasil */
                    $(".step1").hide();
                    $(".outstep2").show();
                }
            });
        }
        /* Se for Brasil */
        else {
            /* Vai para segundo passo, adicionando classe */
            $("#2").removeClass('disabled').addClass('active');
            /* Esconde o primeiro formulÃ¡rio e mostra o segundo formulÃ¡rio para pessoas do Brasil */
            $(".step1").hide();
            $(".brstep2").show();
        }
        return false;
    });
    /* Fim */

    /* AÃ§Ãµes quando o form de dados pessoais for submetido */
    $("#formPersonal").submit(function () {
        $(".message").empty();
        $.ajax({
            url: './php/open-business.php',
            type: 'POST',
            data: 'action=inCountry1&'+$(this).serialize(),
            success: function(retorno){
                console.log(retorno);
                if(retorno === 'name'){
                    $(".message").html("<div class='alert alert-warning'>Por favor, insira seu Nome Completo</div>");
                }

                else if(retorno === 'email'){
                    $(".message").html("<div class='alert alert-warning'>Por favor, insira um endereÃ§o de Email vÃ¡lido</div>");
                }
                else if(retorno === 'emailused'){
                    $(".message").html("<div class='alert alert-warning'>Este endereÃ§o de email jÃ¡ estÃ¡ cadastrado. Por favor, insira um novo ou <a href='contact-us.php' target='_blank'>entre em contato conosco</a>.</div>");
                }

                else if(retorno === 'phone'){
                    $(".message").html("<div class='alert alert-warning'>Por favor, insira um nÃºmero de Telefone vÃ¡lido</div>");
                }

                else if(retorno === 'cpf'){
                    $(".message").html("<div class='alert alert-warning'>Por favor, insira um CPF vÃ¡lido</div>");
                }
                else if(retorno === 'cpfused'){
                    $(".message").html("<div class='alert alert-warning'>Este CPF jÃ¡ estÃ¡ cadastrado. Por favor, insira outro ou <a href='contact-us.php' target='_blank'>entre em contato conosco</a>.</div>");
                }

                else if(retorno === 'success'){
                    $("#3").removeClass('disabled').addClass('active');
                    $(".brstep2").hide();
                    $(".brstep3").show();
                }else{
                    $(".message").html("<div class='alert alert-danger'>An unexpected error occurred, please reload the page and try again.</div>");
                }
            }
        });

        return false;
    });
    /* Fim */

    /* AÃ§Ãµes quando o form de localizaÃ§Ã£o for submetido */
    $("#formLocale").submit(function () {
        $(".message").empty();

        $.ajax({
            url: './php/open-business.php',
            type: 'POST',
            data: 'action=inCountry2&' + $(this).serialize(),
            success: function (retorno) {
                console.log(retorno);
                if (retorno === 'zipcode') {
                    $(".message").html("<div class='alert alert-warning'>Por favor, insira um CEP vÃ¡lido</div>");
                }else if(retorno === 'type'){
                    $(".message").html("<div class='alert alert-warning'>Por favor, selecione o tipo da empresa</div>");
                } else if (retorno === 'success') {
                    $("#4").removeClass('disabled').addClass('active');
                    $(".brstep3").hide();
                    $(".brstep4").show();
                } else {
                    $(".message").html("<div class='alert alert-danger'>An unexpected error occurred, please reload the page and try again.</div>");
                }
            }
        });
        return false;
    });
    /* Fim */


    /* AÃ§Ãµes quando form de contato para pessoas fora do paÃ­s for submetido */
    $("#formEmail").submit(function () {
        $(".message").empty();

        $.ajax({
            url: './php/open-business.php',
            type: 'POST',
            data: 'action=outCountry2&'+$(this).serialize(),
            success: function(retorno){
                console.log(retorno);
                if(retorno === 'name'){
                    $(".message").html("<div class='alert alert-warning'>Please enter your full name</div>");
                }else if(retorno === 'email'){
                    $(".message").html("<div class='alert alert-warning'>Please enter a valid email address</div>");
                }else if(retorno === 'emailused'){
                    $(".message").html("<div class='alert alert-warning'>This email address is already registered. Please enter a new email address or <a href='contact-us.php' target='_blank'>contact us</a>.</div>");
                }else if(retorno === 'success'){
                    $("#4").removeClass('disabled').addClass('active');
                    $(".outstep2").hide();
                    $(".outstep3").show();
                }else{
                    $(".message").html("<div class='alert alert-danger'>An unexpected error occurred, please reload the page and try again.</div>");
                }
            }
        });

        return false;
    });
    /* Fim */


    /* Executa a requisiÃ§Ã£o quando o campo CEP perder o foco */
    $('#zipcode').blur(function () {
        /* Configura a requisiÃ§Ã£o AJAX */
        $.ajax({
            url: './php/open-business.php', /* URL que serÃ¡ chamada */
            type: 'POST', /* Tipo da requisiÃ§Ã£o */
            data: 'action=zipcode&zipcode=' + $('#zipcode').val(), /* dado que serÃ¡ enviado via POST */
            dataType: 'json', /* Tipo de transmissÃ£o */
            beforeSend: function () {
                $('#loadingZ').fadeIn();
            },
            timeout: 3000,
            success: function (data) {
                $('#loadingZ').fadeOut();
                if (data.sucesso == 1) {
                    $('#street').val(data.rua);
                    $('#district').val(data.bairro);
                    $('#city').val(data.cidade);
                    $('#state').val(data.estado);

                    $('#number').focus();
                }
            },
            error: function () {
                $('#loadingZ').fadeOut();
                $('#street').focus();
            }
        });
        return false;
    });
    /* Fim */

    /* FunÃ§Ã£o para popular ombobox de Paises */
    function pais(){
        $.ajax({
            url: './php/open-business.php', /* URL que serÃ¡ chamada */
            type: 'POST', /* Tipo da requisiÃ§Ã£o */
            data: 'action=country',
            success: function (countries) {
                $("#country").html(countries);
            }
        });
    }
    /* Fim */
});