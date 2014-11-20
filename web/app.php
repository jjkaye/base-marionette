<?php
require_once(__DIR__ . '/../vendor/autoload.php');

//-- Allow options to be set in files that include this one
if (!isset($silexOptions)) {
    $silexOptions = array();
}
$app = new BaseMarionette\AppKernel($silexOptions);

$app->run();
