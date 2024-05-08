import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
  profileImage: string | undefined;
  setProfileImage: Dispatch<SetStateAction<string | undefined>>;
}

export default function Picture({ profileImage, setProfileImage }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const result = fileReader.result as string;

      setProfileImage(result);
    };

    fileReader.readAsDataURL(files[0]);
  };

  return (
    <div
      style={{
        width: '80px',
        height: '80px',
        margin: '0 auto',
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundImage: 'url("/images/icon-profile.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100%',
      }}
    >
      <Label
        htmlFor="picture"
        className="block cursor-pointer w-full h-full -indent-96"
        style={
          profileImage
            ? {
                backgroundImage: `url(${profileImage})`,
                backgroundSize: 'cover',
              }
            : undefined
        }
      >
        Picture
      </Label>
      <Input
        id="picture"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleChange}
        hidden
      />
    </div>
  );
}
