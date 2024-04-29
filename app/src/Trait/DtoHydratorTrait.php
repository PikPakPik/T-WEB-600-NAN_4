<?php

namespace App\Trait;

trait DtoHydratorTrait
{
    public function withObject(object $object): self
    {
        $data = get_object_vars($object);

        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->{$key} = $value;
            }
        }

        return $this;
    }
}
