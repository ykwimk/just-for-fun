import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/app/ui/dialog';
import { FormEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/app/ui/button';
import { useUserInfo } from '@/stores';
import { setStorage } from '@/lib/utils';

export default function EntryModal() {
  const { setUserInfo } = useUserInfo();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setUserInfo({ nickname: value });
    setStorage({ key: 'just-a-chat-nickname', value });
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[320px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Please write your nickname!</DialogTitle>
          <DialogDescription>
            Make changes to your nickname here.
            <br />
            Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="w-full py-4">
            <div className="w-full">
              <Input
                type="text"
                id="nickname"
                value={value}
                autoComplete="off"
                maxLength={12}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!value.trim()}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
