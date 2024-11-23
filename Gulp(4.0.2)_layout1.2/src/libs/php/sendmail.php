<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //от кого письмо
    $mail->setFrom('dmitriylyubim@gmail.com', 'от Димаса');
    //    кому отправить
    $mail->addAddress('dmitriylyubim@gmail.com');
    //    тема письма
    $mail->Subject = 'Это тема письма';


//radiobuttons(Рука)
$hand = "Правая";
if($_POST['hand'] == "left"){
    $hand = "Левая";
}

//тело письма
$body = '<h1>Получите, распишитесь!</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> ' .$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>e-mail:</strong> ' .$_POST['email'].'</p>';
}
if(trim(!empty($_POST['hand']))){
    $body.='<p><strong>Рука:</strong> ' .$hand.'</p>';
}
if(trim(!empty($_POST['age']))){
    $body.='<p><strong>Возврвст:</strong> ' .$_POST['age'].'</p>';
}

if(trim(!empty($_POST['massage']))){
    $body.='<p><strong>Сообщение:</strong> ' .$_POST['massage'].'</p>';
}

//прикрепить файл
if(!empty($_FILES['image']['tmp_name'])){
//путь загрузки файлоа
    $filePath = __DIR__ . "files/" . $_FILES['image']['name'];
//    грузим файл
    if(copy($_FILES['image']['tmp_name'], $filePath)){
        $fileAttach = $filePath;
        $body.='<p><strong>Фото в приложении</strong></p>';
        $mail->addAttachment($fileAttach);
    }

    if(!mail->send()){
        $message = 'Ошибка';
    }
    else{
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
}