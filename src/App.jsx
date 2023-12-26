/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { formatDistanceToNowStrict, isAfter } from "date-fns";

import "./App.css";
import Wishes from "./Wishes";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";

function formatTime(seconds) {
  const days = Math.floor(seconds / (60 * 60 * 24));
  seconds -= days * (60 * 60 * 24);
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  const result = [days, hours, minutes, seconds];
  return result.map((e) => e.toString().padStart(2, "0"));
}

const Header = ({ imgSrc }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Avatar
        isBordered
        color="success"
        src={imgSrc}
        className="w-[64px] h-[64px] text-large"
      />
      <Chip color="success" variant="dot" size="sm">
        <a href="https://www.instagram.com/tq.nga/">tq.nga</a>
      </Chip>
    </div>
  );
};

const arr = [11, 27, 0, 0, 0];

export default function App() {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [open, setOpen] = useState(false);

  const thisYear = new Date().getFullYear();
  const isAfterBirthday = isAfter(new Date(), new Date(thisYear, ...arr));
  let birthday;
  if (isAfterBirthday) {
    birthday = new Date(thisYear + 1, ...arr);
  } else {
    birthday = new Date(thisYear, ...arr);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const result = formatDistanceToNowStrict(birthday, {
        unit: "second",
      });
      const secsLeft = Number(result.split(" ").at(0));
      if (secsLeft === 0) setOpen(true);

      setSecondsLeft(secsLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [birthday]);

  const [days, hours, minutes, seconds] = formatTime(secondsLeft);

  return (
    <div className="w-80">
      <Card fullWidth className="p-3">
        <CardHeader className="justify-center">
          <Header imgSrc={img1} />
        </CardHeader>
        <CardBody className="items-center gap-4">
          <div className="flex justify-center">
            <div className="flex gap-1">
              <Chip radius="md">{days}</Chip>
              <p>:</p>
              <Chip radius="md">{hours}</Chip>
              <p>:</p>
              <Chip radius="md">{minutes}</Chip>
              <p>:</p>
              <Chip radius="md">{seconds}</Chip>
            </div>
          </div>
          {isAfterBirthday && (
            <Button
              isIconOnly
              color="danger"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <svg
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          )}
        </CardBody>
      </Card>
      <Modal
        size="lg"
        isOpen={open}
        hideCloseButton
        classNames={{ backdrop: "bg-[#292f46]/50 backdrop-opacity-40" }}
      >
        <ModalContent className="p-4">
          <ModalHeader className="justify-center">
            <Header imgSrc={img2} />
          </ModalHeader>
          <ModalBody>
            <Wishes setOpen={setOpen} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
