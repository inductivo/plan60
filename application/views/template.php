<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Plan 60</title>
      <link href="<?= base_url('css/bootstrap.min.css')?>" rel="stylesheet">
      <link href="<?= base_url('css/style.css')?>" rel="stylesheet">
  </head>
  <body>
    <header>
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="<?php echo site_url('principal'); ?>">
              <span><strong>Plan 60</strong></span>
            </a>
          </div>
        </div>
      </nav>
    </header>
    <div id="main" class="container">
    <div id="loading" class="row"></div>
      <?php $this->load->view($contenido); ?>
    </div>
    <footer>
      <nav class="navbar navbar-default navbar-fixed-bottom">
        <div class="container"></div>
      </nav>
    </footer>
  </body>
</html>
