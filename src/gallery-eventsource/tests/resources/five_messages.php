<?php
header("Content-type: text/event-stream");
header("Cache-control: no-cache");
?>
data: hello1

<?php
    flush();
    sleep(1);
?>
data: hello2

<?php
    flush();
    sleep(1);
?>
data: hello3

<?php
    flush();
    sleep(1);
?>
data: hello4

<?php
    flush();
    sleep(1);
?>
data: hello5

