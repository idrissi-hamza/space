'use client';
import React, { useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '@/data/categories';
import CategoryInput from '../Input/CategoryInput';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

// Define the Zod schema for the form fields
const zodFormSchema = z.object({
  category: z.string(),
  location: z.nullable(z.string()), // Assuming the location can be null or a string
  guestCount: z.number().int().min(1),
  roomCount: z.number().int().min(1),
  bathroomCount: z.number().int().min(1),
  imageSrc: z.string(),
  price: z.number().min(1),
  title: z.string(),
  description: z.string(),
});

type FormFieldValues = z.infer<typeof zodFormSchema>;

type FormFieldKeys = keyof FormFieldValues;

const RentModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen: isRentOpen, onClose: onRentClose } = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  //form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormFieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');

  const setCustomValue = (id: FormFieldKeys, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-2 md:grid-cols-3 
          gap-1 md:gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {Object.entries(categories).map(([label, { icon, description }]) => (
          <div
            key={label}
            className="col-span-1s"
          >
            {/* {label} */}
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === label}
              label={label}
              icon={icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isRentOpen}
      title="You Home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={onRentClose}
      onSubmit={onNext}
      body={bodyContent}
    />
  );
};

export default RentModal;