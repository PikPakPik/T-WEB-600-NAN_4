<?php

namespace App\Trait;

trait DtoHydratorTrait
{
    /**
     * @param array<string, string|int|bool> $data
     */
    public function withArray(array $data): self
    {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->{$key} = $value;
            }
        }

        return $this;
    }

    /**
     * @param object $object
     */
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
