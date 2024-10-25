import React, { useState } from "react";
import { Target } from "../types/target";
import { IoEyeSharp } from "react-icons/io5";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaRegTrashAlt,
} from "react-icons/fa";

interface TargetListProps {
  targets: Target[];
  onSelectTarget: (target: Target) => void;
  onDeleteTarget: (id: number) => void;
}

const TargetList: React.FC<TargetListProps> = ({
  targets,
  onSelectTarget,
  onDeleteTarget,
}) => {
  const [showTargets, setShowTargets] = useState(false);

  return (
    <section className="target-list">
      <div className="target-list-title">
        <h2>Targets</h2>
        <button onClick={() => setShowTargets(!showTargets)}>
          {showTargets ? (
            <FaArrowAltCircleUp size={30} color="#000" />
          ) : (
            <FaArrowAltCircleDown size={30} color="#000" />
          )}
        </button>
      </div>
      {showTargets &&
        (targets.length > 0 ? (
          <ul>
            {targets.map((target) => (
              <li
                key={target.id}
                className={`${
                  target.isComplete && "targetDone"
                } target-not-done`}
              >
                <div className="target-title">{target.title}</div>
                <div className="target-actions">
                  <button
                    onClick={() => onSelectTarget(target)}
                    className="show-todos"
                  >
                    <IoEyeSharp size={20} />
                  </button>
                  <button onClick={() => onDeleteTarget(target.id)}>
                    <FaRegTrashAlt size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há targets no momento...</p>
        ))}
    </section>
  );
};

export default TargetList;
