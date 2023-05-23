<?php

use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;

$factory = new PasswordHasherFactory([
  'common' => ['algorithm' => 'bcrypt']
]);

$stringHasher = $factory->getPasswordHasher('common');