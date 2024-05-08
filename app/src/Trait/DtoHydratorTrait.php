<?php

namespace App\Trait;

trait DtoHydratorTrait
{
    public function withObject(object $object): self
    {
        $ignore = ['category'];
        $data = get_object_vars($object);

        foreach ($data as $key => $value) {
            if (property_exists($this, $key) && !in_array($key, $ignore)) {
                $this->{$key} = $value;
            }
        }

        return $this;
    }
}
