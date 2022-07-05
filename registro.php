<!-- HTML5 -->
<!DOCTYPE html>

<!-- HTML -->
<html lang="en">

<!-- HEAD -->
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="css/login_registro.css">
    <title>TSE - Registro</title>
</head> <!--fin.Head-->

<!-- BODY -->
<body>

     <!-- CONTENIDO PRINCIPAL -->
     <div class="contenedor__titulo">
        <h1>¡Regístrate!</h1>
    </div>

    <main class="contenedor">
        <div class="contenedor__modal">
            <form class="formulario row g-3">
                <div class="col-6">
                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                    <input type="email" class="form-control" id="exampleInputEmail1">
                </div>  
                <div class="col-6">
                    <label for="exampleInputEmail1" class="form-label">Apellido</label>
                    <input type="email" class="form-control" id="exampleInputEmail1">
                </div>
                <div class="col-12">
                    <label for="exampleInputEmail1" class="form-label">Usuario</label>
                    <input type="email" class="form-control" id="exampleInputEmail1">
                </div>
                <div class="col-12" id="ultimo">
                    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary"><a href="login.php">Registrarse</a></button>
                <div class="contenedor__pregunta">
                    <p>¿Ya tienes cuenta? -
                        <a href="login.php">Inicia Sesión</a>
                    </p>
                </div>
            </form>
        </div>
    </main> <!--fin.main-->

</body> <!--fin.body-->

<!-- JAVASCRIPT -->
<script src="js/script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>

</html> <!--fin.html-->