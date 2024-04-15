import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { css } from '@emotion/react';

export default function Picture() {
  return (
    <div css={picture}>
      <Label
        htmlFor="picture"
        className="block cursor-pointer w-full h-full -indent-96"
      >
        Picture
      </Label>
      <Input id="picture" type="file" hidden />
    </div>
  );
}

const picture = css`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  background: url('/images/icon-profile.png') no-repeat center;
  background-size: 100%;
`;
